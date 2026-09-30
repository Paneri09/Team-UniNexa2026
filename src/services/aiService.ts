import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function askCampusAI(prompt: string, history: ChatMessage[] = []): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (import.meta as any).env?.VITE_GEMINI_API_KEY ||
                 (import.meta as any).env?.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are NexaONE AI, the intelligent, friendly 24/7 Smart Campus Assistant for the University Digital Campus.
The current student user is Aarav Sharma (Roll No: VU26ECE014, B.Tech ECE, 1st Semester).
Current overall attendance: 82% (41 out of 50 classes). Good standing. Subject attendance: Digital Electronics 86%, Engg Math 80%, Engg Physics 78%, Programming 88%, Engg Graphics 76%.
Upcoming assignments: Logic Gates Assignment (Digital Electronics, due Oct 3, 2026), Unit 1 Problem Set (Math, due Oct 5), Lab Report (Physics, due Oct 7).
Faculty: Dr. Priya Mehta (ECE, Room 304 Block C).
Next exams: Engineering Mathematics on Oct 18 in Block A Room 204; Digital Electronics Practical Quiz on Oct 22.
Events: AI Workshop on Oct 8, TechNova 2026 on Oct 15 at Campus Main Arena.
Campus buildings: Central Admin Block, School of Engg, ECE Dept & VLSI Complex, Central Digital Library (24/7), Computer Labs, Grand Auditorium, Hostels, Cafeteria, Sports Complex.
Keep your answers helpful, concise, well-formatted, friendly, and practical.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }
        ]
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call fell back to local campus intelligence:', err);
    }
  }

  // Realistic instant smart campus responder
  const p = prompt.toLowerCase();

  if (p.includes('attendance')) {
    return `Your overall attendance is **82%** (41 attended out of 50 classes), which is in **Good Standing** above the university 75% requirement.

Here is your current subject-wise breakdown:
• **Programming Fundamentals**: 88% (Excellent)
• **Digital Electronics**: 86% (Healthy)
• **Engineering Mathematics**: 80% (Healthy)
• **Engineering Physics**: 78% (Healthy)
• **Engineering Graphics**: 76% (⚠️ Approaching 75% threshold)

You can inspect daily lecture records in the **Attendance** tab.`;
  }

  if (p.includes('ece') || p.includes('department') || p.includes('priya')) {
    return `The **ECE Department & VLSI Complex (Block C)** is located on the northeastern side of the central university plaza.

• **HOD & Faculty Office**: Dr. Priya Mehta is in **Room 304, 3rd Floor**.
• **Laboratories**: Digital Electronics & Microprocessor Labs are on the 2nd Floor (Rooms 204 & 206).
• **Visiting Hours**: Monday to Friday, 03:00 PM – 05:00 PM.`;
  }

  if (p.includes('exam') || p.includes('test') || p.includes('quiz')) {
    return `Here are your upcoming mid-semester examinations:

1. **Engineering Mathematics Mid-Term**:
   📅 **18 October 2026** at 10:00 AM – 12:30 PM
   📍 Block A, Examination Hall 204

2. **Digital Electronics Practical & Viva**:
   📅 **22 October 2026** at 02:00 PM
   📍 Hardware Lab 102 (Conducted by Dr. Priya Mehta)

Syllabus blueprints are available in the **Academic Calendar** section.`;
  }

  if (p.includes('assignment') || p.includes('homework') || p.includes('due') || p.includes('pending')) {
    return `You have **3 pending assignments** due in the coming days:

1. **Digital Electronics**: *Logic Gates Assignment*
   • Due in **3 days** (03 October 2026) · Max 25 marks
2. **Engineering Mathematics**: *Unit 1 Problem Set*
   • Due in **5 days** (05 October 2026) · Max 20 marks
3. **Engineering Physics**: *Lab Report (Wave Optics & Interference)*
   • Due in **7 days** (07 October 2026) · Max 15 marks

Head to the **Assignments** tab to upload and submit your solutions directly!`;
  }

  if (p.includes('marksheet') || p.includes('transcript') || p.includes('document') || p.includes('id card') || p.includes('fee')) {
    return `You can access and download all official verified university documents from your **Document Vault**:

• **Semester 1 Mid-Term Marksheet**: Available with current SGPA of **8.84**.
• **NexaONE Smart Campus ID Card**: Includes your digital NFC token and secure QR pass.
• **Tuition Fee Receipt**: ₹68,500 settled via MPOnline Gateway with zero pending dues.

Navigate to **Document Vault** from the sidebar to view or download high-resolution PDF copies.`;
  }

  if (p.includes('event') || p.includes('fest') || p.includes('technova') || p.includes('workshop')) {
    return `Here are the top campus events happening this month:

• **AI Workshop: Hands-on Generative AI & Edge Neural Systems**
  📅 08 October 2026 · 📍 Auditorium 2 · *Status: You are Registered ✓*

• **TechNova 2026 — State Innovation & Tech Fest**
  📅 15 October 2026 · 📍 Campus Main Arena · Grand robotics expo and hackathon challenges!

• **ECE Industry Talk on Semiconductor Fabs**
  📅 18 October 2026 · 📍 Seminar Hall A

You can RSVP or browse certificates in the **Campus Events** module.`;
  }

  if (p.includes('library') || p.includes('book') || p.includes('floyd') || p.includes('grewal')) {
    return `The **NexaONE Central Digital Library** is open 24/7 for study carrels and 08:00 AM – 10:00 PM for issue counters.

Recommended course texts ready to read in your **E-Library**:
• *Digital Fundamentals* by Thomas L. Floyd (11th Global Edition)
• *Higher Engineering Mathematics* by B.S. Grewal (44th Edition)
• *Concepts of Modern Physics* by Arthur Beiser

You can view, search, and download full textbooks directly in the **E-Library** tab.`;
  }

  if (p.includes('map') || p.includes('cafeteria') || p.includes('hostel') || p.includes('sports') || p.includes('where is')) {
    return `The interactive **Campus Map** covers all 10 key facilities:
• **Central Administration Block (ADM)**: Main entrance plaza.
• **School of Engineering (SET)**: North quad.
• **Central Digital Library (LIB)**: West quad.
• **Student Cafeteria & Food Court (CAF)**: Central gardens, open until 11:00 PM.
• **Sports Complex & Gym (SPT)**: South campus athletic grounds.

Open **Campus Map** from the top header to view walking routes and facility timings!`;
  }

  if (p.includes('helpdesk') || p.includes('ticket') || p.includes('wifi') || p.includes('complaint')) {
    return `You can raise IT, academic, hostel, or fee issues through the **Helpdesk** portal.
Your existing ticket **NX-2048** (*Wi-Fi connectivity issue in Block B 2nd floor*) is currently **In Progress** with the network team having replaced the PoE switch port.`;
  }

  return `Hello Aarav! I am **NexaONE AI**, your unified university digital campus assistant.

I can help you instantly with:
• **Attendance stats** & subject health
• **Pending assignments** & submission deadlines
• **Exam dates** & syllabus schedules
• **Campus locations** & department offices
• **E-Library downloads** & verified vault documents
• **Upcoming campus events** & registrations

Try asking: *"What is my attendance?"* or *"When is my next exam?"*`;
}
