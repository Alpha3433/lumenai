
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, from }: EmailRequest = await req.json();
    console.log("Email request received:", { to, subject, from: from || "default sender" });

    // Ensure the from value is valid
    const sender = from || "Lovable <onboarding@resend.dev>";
    
    console.log("Attempting to send email with Resend...");
    const emailResponse = await resend.emails.send({
      from: sender,
      to: [to],
      subject: subject,
      html: html,
    });

    console.log("Email sending response:", JSON.stringify(emailResponse, null, 2));

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    console.error("Error details:", error.message, error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.response?.data || "No additional details" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
