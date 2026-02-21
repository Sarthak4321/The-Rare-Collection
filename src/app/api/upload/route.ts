import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";

export async function POST(request: Request) {
    try {
        const { filename, contentType } = await request.json();

        if (!filename || !contentType) {
            return NextResponse.json(
                { error: "Filename and contentType are required" },
                { status: 400 }
            );
        }

        // Validation to prevent placeholder errors
        if (!process.env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID === "your_account_id") {
            return NextResponse.json(
                { error: "Cloudflare R2 is not configured. Please fill in your Account ID in the .env file." },
                { status: 500 }
            );
        }

        const key = `uploads/${Date.now()}-${filename}`;
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });

        const signedUrl = await getSignedUrl(r2, command, { expiresIn: 3600 });
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ url: signedUrl, publicUrl, key });
    } catch (error: any) {
        console.error("Presigned URL error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
