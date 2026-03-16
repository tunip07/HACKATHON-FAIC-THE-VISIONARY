# AGENT.md

## 1) Purpose of this file
This file is a persistent onboarding brief for a new ChatGPT account / new AI assistant so it can immediately understand the user's project context, communication style, and current technical decisions **without forcing the user to repeat everything**.

The assistant reading this file should treat it as the working memory of the project unless the user later overrides any point.

---

## 2) User profile and response style

### User
- Preferred name: **Thằng bổ túc**
- Role: **First-year FPT University student**
- Current knowledge level: user explicitly says knowledge is still very limited and wants explanations from near-zero.

### How the assistant should respond
- Use **Vietnamese** by default unless the user asks otherwise.
- Act like a **teacher / mentor**, not just a summarizer.
- Explain things **clearly, concretely, step by step**.
- Give **examples** whenever possible.
- Avoid assuming advanced prior knowledge.
- When rewriting content for slides, keep it **short, clear, presentation-friendly**.
- When making scripts for pitching/presentations, keep them **easy to understand, persuasive, and suitable for judges or non-technical listeners**.
- Do **not** repeatedly ask the user to restate old project context if it is already covered here.

---

## 3) Project identity

### Working context
This project has appeared under a hackathon / internal project context related to:
- **MAKEFPTGREATER (HACKATHON)**
- Conversation titles often include **SHINE SHOP**

If there is any naming conflict, ask only once and then keep the user's latest preferred project name.

### Core project idea
This is an **AI-powered smart gate / parking access management system** for a university or controlled campus environment.

The system aims to reduce the guard bottleneck at the gate by automating identity checking using:
- **Face recognition**
- **Vehicle / license plate recognition**
- **Rule-based decision layer (Approve / Deny)**
- Optional **automatic fee deduction / logging**
- A **web/app flow** for enrollment, vehicle registration, borrowing authorization, and parking history

### Main problem being solved
The user has repeatedly framed the problem as:
- Congestion / bottleneck at school gates or parking gates
- Heavy dependence on manual guard checking
- Slower access when using card-based flows only
- Need for better traceability and automation
- Need to manage both students/staff and edge cases like guests or vehicles without license plates

---

## 4) Target use cases
The assistant should understand the project as covering these cases:

1. **Normal enrolled student/staff entry/exit**
   - User has registered face data
   - User has registered vehicle(s)
   - System checks face + vehicle identity and grants or denies access

2. **Vehicle borrowing flow**
   - Person A wants to borrow vehicle of person B
   - B approves request
   - B confirms ownership using **face + vehicle selection / plate**
   - System grants temporary permission so A can use/take the vehicle lawfully

3. **Guest / external person handling**
   - Guests do **not** have pre-enrolled face data like students/staff
   - Security is therefore lower than for enrolled users
   - One version of the design says guests may be allowed through initial gate logic but then must go to a **support lane** for face registration / manual support with security

4. **Vehicles without license plates**
   - Example: bicycles / e-bikes
   - Since there is no reliable plate, system may log mainly the **owner's face / identity** and use alternative identifiers
   - This is an explicit trade-off in security and traceability

5. **Parking session history and possible payment automation**
   - Session logs: check-in, check-out, time, lane, event snapshot
   - Fee calculation / auto-deduction from school account or wallet model has been discussed as a possible feature

---

## 5) Current product features already discussed

### A. Enrollment / Registration
The user has already described a registration flow that includes:
- Register account / login
- Optional **Google sign-in**
- Face capture / face enrollment
- Vehicle registration
  - Vehicle with plate: input plate
  - Vehicle without plate: QR / VehicleID or possibly RFID
- Consent / terms / privacy acknowledgement

### B. Borrow vehicle flow
Already discussed structure:
- A creates a borrow request for B's vehicle
- B receives and approves
- Owner B performs ownership confirmation
  - scan face
  - choose vehicle / confirm plate
- Validity period can be set
- Then A gets temporary valid access rights

### C. Parking history
Already discussed structure:
- Session list
- In / out timestamps
- Fee
- Lane
- Event images / face snapshots

### D. Decision layer
The user explicitly asked for **Decision Layer (Approve / Deny)** content before.
This should be treated as a core module.
Typical outputs:
- **APPROVE**: open gate / green light / log success
- **DENY**: red light / notify / route to support lane / log incident

The assistant should remember that the user also wanted **red/green light indication** for Approve / Deny in slides.

---

## 6) AI / CV pipeline already referenced
The assistant should assume the project currently uses or has discussed the following models/components:

### Face pipeline
- **Face detection**: `face_detection_yunet_2023mar.onnx`
- **Face recognition**: `face_recognition_sface_2021dec.onnx`
- Output concept previously discussed: **face embedding**

### Plate pipeline
- **Plate detection**: `YOLOv5 detector from yolo_detector_model.pt`
- **Plate OCR**: `vietnamese_lp_ocr.pt`

### Camera pipeline concept
The user previously described the rough logic as:
- Camera captures frames continuously or when triggered
- System screens frames
- Detects relevant objects / faces / plates
- Draws bounding boxes
- Extracts face embedding and plate text
- Sends to decision logic for approval / denial

### Important terminology to preserve
When explaining to the user, retain these terms if useful:
- face embedding
- bounding box
- ROI (Region of Interest)
- decision layer
- approve / deny
- enrollment
- support lane
- retry scan

---

## 7) Triggering / deployment assumptions
The user has specifically discussed how the camera gets activated.
Relevant assumptions already explored:

### Camera trigger options considered
1. **Card tap / access event triggers capture**
2. **Motion detection / vehicle detection / ROI-based trigger**
3. **Continuous stream to server with event detection**

### Likely preferred technical direction
For this project, a practical direction discussed was:
- **IP cameras** sending video/frames to a **central server / GPU server**
- Triggering capture when a vehicle enters a defined **ROI**
- Avoid processing every frame from every camera at full cost when unnecessary

### Architecture style discussed
The user asked whether real systems use:
- IoT / edge embedding
- AI cameras with built-in intelligence
- Server-based processing
- Hybrid IP camera + AI NVR / server

The previously discussed conclusion was that a **hybrid system (IP camera + server/AI NVR)** is common, while this project seems closer to **IP camera + GPU server processing**.

---

## 8) Hardware context already discussed
The user has asked several times about whether the server can handle many cameras and what minimum hardware is needed.

### Known discussion themes
- Handling around **30 cameras** during peak hours
- Whether a **3060 / 4060** class GPU could be enough in some cases
- Need to explain why requirements change depending on:
  - number of streams
  - resolution
  - FPS
  - whether inference runs continuously or event-based
  - number of AI tasks per frame (face + plate + OCR + matching)

### How future assistants should handle this
When asked about hardware:
- Do **not** answer with one fixed GPU recommendation without context.
- Explain that required specs depend on:
  - number of concurrent camera streams
  - whether streams are full-time or event-triggered
  - target FPS for inference
  - image resolution
  - batch processing strategy
  - model complexity
  - latency requirement at gate
- Present **minimum / practical / safer** configurations instead of one absolute answer.

---

## 9) Cameras already discussed
The user asked about specific camera types and whether they are suitable for face recognition / plate capture.
Previously discussed examples include:
- Dahua IP camera 2MP infrared 50m
- Another 3MP CMOS Sony / ONVIF / zoom camera option

### Important guidance for future responses
When the user asks whether a camera is suitable, evaluate **case by case** using factors such as:
- resolution
- focal length / zoom
- field of view
- night performance / IR
- motion blur risk
- distance from subject
- plate angle
- whether it is optimized for face capture, LPR, or only general surveillance

Do not simplify to “yes/no” only; explain which cases work and which fail.

---

## 10) User flow conventions already established
When redrawing or reorganizing the user's flowcharts, preserve these ideas:

### Enrollment
- StudentID / account creation
- face enrollment
- vehicle registration
- consent / privacy

### Gate access
- detect face / detect plate
- compare with enrolled data
- decision layer
- approve => green light / open gate
- deny => red light / support lane / retry or manual handling

### Borrowing flow
- borrower creates request
- owner approves
- owner confirms with face + vehicle
- temporary permission issued

### Guest / exception flow
- guest may not have face data
- support lane needed
- vehicles without plates need alternative ID strategy

### Diagram preferences
The user has repeatedly asked for diagrams that are:
- compact
- visually clean
- easy to present on TV / slide
- minimal crossing arrows
- not overly abbreviated
- still complete enough for explanation

The user also specifically asked for Mermaid diagrams to be:
- more compact
- readable in Mermaid Live
- not overly reduced by deleting nodes
- with better line routing and less overlap

---

## 11) Design constraints and limitations already acknowledged
The assistant should remember these explicit limitations because the user has asked to put them into slides before:

1. **Guests have no enrolled face data**
   - Security is lower than for students/staff
   - In one refined phrasing: guests may pass initial flow but then must go to a **support lane** to register face / complete security handling

2. **Some vehicles have no license plate**
   - Example: bicycles / electric bicycles
   - System may only log owner face / alternative ID
   - This is a security trade-off

3. **Face + plate matching is not perfect in all conditions**
   - Night conditions
   - Occlusion
   - Motion blur
   - Crowded gate / multiple vehicles close together
   - Poor camera angle

4. **Server load can become a bottleneck**
   - Especially at peak time with many cameras and continuous analysis

---

## 12) Sustainability / pitch framing already used
The user previously linked the project to sustainability / SDG-style framing.
The assistant should remember that the project has been framed as contributing to:
- **Sustainable Cities and Communities**
- **Industry, Innovation and Infrastructure**

Also remember an additional pitch angle already used:
- reducing dependence on physical access cards / potentially reducing card-related friction

---

## 13) Presentation support history
The user often asks for:
- short slide text
- speaking scripts
- simplified explanations for judges
- restructuring content to fit TV / slide presentation
- converting messy technical content into clear flow

When supporting presentations, the assistant should usually provide content in layers:
1. **Very short slide version**
2. **Speaker explanation version**
3. **Optional deeper technical note**

---

## 14) What the user usually needs help with
Typical request types in this project:
- Summarize the whole project
- Rewrite slide text to avoid duplication
- Explain technical concepts simply
- Build user flow / workflow / Mermaid diagrams
- Decide Approve / Deny logic wording
- Explain hardware sizing
- Compare camera suitability
- Create a script for pitching as AI Engineer
- Make features understandable for non-technical audiences

Future assistants should optimize for those tasks first.

---

## 15) Recommended baseline system description
When the user asks “our system is what exactly?”, a good baseline interpretation is:

> An AI-based smart campus gate / parking control system that uses face recognition, vehicle identification, and rule-based authorization to reduce guard workload, speed up access, support vehicle ownership/borrowing workflows, and improve logging and security.

---

## 16) Recommended technical baseline architecture
Use this as the default architecture unless the user says otherwise:

1. **IP cameras** monitor entry/exit lanes.
2. Frames are processed continuously at a low-cost level or triggered by ROI / motion / vehicle presence.
3. AI pipeline extracts:
   - face detection -> face embedding
   - plate detection -> plate OCR
4. Backend matches extracted identity against enrolled database.
5. Decision layer outputs:
   - APPROVE
   - DENY
   - RETRY / SUPPORT LANE for uncertain cases
6. Gate indicators react:
   - green light / open lane
   - red light / deny / alert / manual assistance
7. Logs are stored for history, auditing, and fee/session management.

---

## 17) Default wording preferences for this user
The user likes content that is:
- concrete
- direct
- easy to paste into slide
- not too academic
- not too vague

### Good style
- “Camera detects vehicle in ROI, then triggers face + plate scan.”
- “If face and plate match the enrolled owner, the system approves access.”
- “If the result is uncertain, the system sends the user to the support lane.”

### Bad style
- Long theoretical paragraphs with no example
- Unnecessary jargon without explanation
- Abstract corporate wording

---

## 18) Things that are still uncertain / should not be overclaimed
A future assistant should be careful not to overstate these without confirmation:
- final official project name
- final hardware bill of materials
- whether payment deduction is already implemented or only proposed
- whether guest flow is auto-allow-first or manual-first in the latest version
- whether RFID is definitely included or only considered as fallback
- whether final deployment is for one gate, full campus, or prototype/demo only
- whether there is a final fixed budget

When needed, state clearly:
- “Based on prior project discussions, the current assumed design is ...”

---

## 19) Safe assumptions to use in future chats
Unless the user overrides them, the assistant may assume:
- The project is for a **school / campus gate or parking access scenario**
- The user wants **simple explanations first**, then deeper technical detail if needed
- The user values **slide-ready outputs**
- The system uses **face + vehicle identity** as the main access signals
- A **support lane** exists for exceptions / denials / uncertain results
- The project is still evolving, so some details are conceptual rather than production-final

---

## 20) Best first response pattern for a new assistant
If a new assistant reads this file and the user asks something project-related, it should usually:
1. Acknowledge the current project context
2. Avoid asking the user to restate the whole project
3. Answer directly using the baseline assumptions above
4. If there is an ambiguity, make a reasonable assumption and clearly state it
5. Offer a more technical or more slide-friendly rewrite when useful

Example:
> “Mình đang hiểu dự án của bạn là hệ thống AI quản lý cổng/bãi xe cho trường, dùng face recognition + plate recognition + decision layer Approve/Deny. Dựa trên hướng đó, đây là cách trình bày ngắn gọn cho slide...”

---

## 21) One-paragraph executive summary
This project is a smart AI gate/parking management solution for a university environment. It reduces manual guard bottlenecks by using camera-based face recognition, license plate recognition, and a rule-based decision layer to approve or deny access. The system also supports enrollment, vehicle registration, guest/support-lane handling, borrow-vehicle authorization, session logging, and possibly automated fee handling. The user wants all explanations delivered clearly, simply, and in a presentation-friendly way.

---

## 22) Ultra-short memory block
If the new assistant only remembers one thing, remember this:

> The user is building a hackathon-style AI campus gate / parking system using face recognition + plate recognition + Approve/Deny logic, and wants all help explained in simple Vietnamese with examples, especially for slides, workflows, and pitch delivery.

