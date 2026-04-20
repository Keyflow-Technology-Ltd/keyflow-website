import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { randomUUID } from "crypto";

const dynamo = new DynamoDBClient({});
const ses = new SESClient({});

const TABLE_NAME = process.env.TABLE_NAME!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL!;

const STAKEHOLDER_TYPES = ["agent", "agency", "developer", "owner", "tenant", "other"] as const;

interface WaitlistBody {
  email: string;
  stakeholder_type?: string;
  name?: string;
  company?: string;
  message?: string;
}

export async function handler(event: { body?: string }) {
  try {
    const body: WaitlistBody = JSON.parse(event.body ?? "{}");

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Valid email is required" }) };
    }

    if (body.stakeholder_type && !STAKEHOLDER_TYPES.includes(body.stakeholder_type as typeof STAKEHOLDER_TYPES[number])) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid stakeholder type" }) };
    }

    // Rate limit: max 3 submissions per email per day
    const today = new Date().toISOString().split("T")[0];
    const countResult = await dynamo.send(new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "email = :email AND begins_with(created_at, :today)",
      ExpressionAttributeValues: {
        ":email": { S: body.email },
        ":today": { S: today },
      },
      Select: "COUNT",
    }));

    if ((countResult.Count ?? 0) >= 3) {
      return { statusCode: 429, body: JSON.stringify({ error: "Too many submissions today" }) };
    }

    const now = new Date().toISOString();
    await dynamo.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        email: { S: body.email },
        created_at: { S: now },
        id: { S: randomUUID() },
        ...(body.stakeholder_type && { stakeholder_type: { S: body.stakeholder_type } }),
        ...(body.name && { name: { S: body.name } }),
        ...(body.company && { company: { S: body.company } }),
        ...(body.message && { message: { S: body.message } }),
      },
    }));

    // Send confirmation email to user
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [body.email] },
      Message: {
        Subject: { Data: "Welcome to Keyflow — You're In" },
        Body: { Text: { Data: "Thank you for joining the Keyflow early access list. We'll be in touch soon." } },
      },
    }));

    // Send notification to team
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [NOTIFY_EMAIL] },
      Message: {
        Subject: { Data: `New Waitlist Signup: ${body.email}` },
        Body: {
          Text: {
            Data: [
              `Email: ${body.email}`,
              `Type: ${body.stakeholder_type ?? "N/A"}`,
              `Name: ${body.name ?? "N/A"}`,
              `Company: ${body.company ?? "N/A"}`,
              `Message: ${body.message ?? "N/A"}`,
            ].join("\n"),
          },
        },
      },
    }));

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Waitlist error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
  }
}
