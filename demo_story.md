# 🎬 XYZ 369 Dialectic Decoder - User Journey Storyboard

This storyboard visualizes the core interaction flow of the extension, from installation to the final dialectic synthesis.

---

## 🏁 Scene 1: Installation & Setup (The Onboarding)

**Context:** The user has just installed the extension.

1.  **Browser Action:** User clicks the extension icon for the first time.
2.  **System Check:** The extension immediately checks for `window.ai` (Gemini Nano).
3.  **Branching Path:**
    *   **Path A (Nano Ready):** Status pill shows `⚡ Nano Ready`. Green light.
    *   **Path B (Cloud Fallback):** Status pill shows `⚠️ Setup Needed`.
        *   User clicks pill -> Opens `options.html`.
        *   User enters Gemini API Key -> Clicks "Save".
        *   Status changes to `☁️ Cloud Ready`.

```text
┌──────────────────────────────────────┐
│  XYZ 369 Decoder               ⚙️    │
├──────────────────────────────────────┤
│  [ ☁️ Cloud Ready                ]   │ <-- Status Pill
│                                      │
│  Ready to analyze this page?         │
│                                      │
│  [ 🧠 Decode (369) ] [ 📝 Summary ]  │
└──────────────────────────────────────┘
```

---

## 🕵️ Scene 2: The Analysis (The Trigger)

**Context:** User is reading a complex article about "The Impact of Remote Work on Urban Economies".

1.  **Action:** User clicks **[ 🧠 Decode (369) ]**.
2.  **UI Transformation:** The "Controls" fade out. The "Terminal Loader" slides up.
3.  **Feedback Loop:**
    *   **Meta Extraction:** "Reading 1,240 words..."
    *   **Strategy Selection:** "Strategy: On-Device (Privacy Mode)"
    *   **Process:** "Applying Hegelian Dialectic..."

```text
┌──────────────────────────────────────┐
│  XYZ 369 Decoder                     │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │ ● ● ●  processing.exe          │  │
│  ├────────────────────────────────┤  │
│  │ > Reading DOM... OK            │  │
│  │ > Word Count: 1240             │  │
│  │ > Persona: CHOLA initialized   │  │
│  │ > Persona: MALANDRA injected   │  │
│  │ > Synthesizing...              │  │
│  │ _                              │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 🎭 Scene 3: The Reveal (The 369 Result)

**Context:** The AI has finished processing. The terminal collapses, and the result cards cascade in.

1.  **Thesis (CHOLA):** First card appears. Blue header.
    *   *Content:* "Look, the reality is cities are losing tax revenue. It's historic, it's raw facts."
2.  **Antithesis (MALANDRA):** Second card appears. Red header.
    *   *Content:* "Yeah, but watch out. Real estate corps are pushing this narrative to force RTO. Don't believe the hype."
3.  **Synthesis (FRESA):** Third card appears. Green header.
    *   *Content:* "So, the strategic move is hybrid adaptive reuse of buildings. We elevate the city experience, you know?"

```text
┌──────────────────────────────────────┐
│  XYZ 369 Decoder               🔄    │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │ CHOLA (Thesis)                 │  │
│  ├────────────────────────────────┤  │
│  │ "La neta, remote work is here. │  │
│  │ Cities gotta adapt or die..."  │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ MALANDRA (Antithesis)          │  │
│  ├────────────────────────────────┤  │
│  │ "But who benefits? Big Tech    │  │
│  │ is outsourcing to cheaper..."  │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ FRESA (Synthesis)              │  │
│  ├────────────────────────────────┤  │
│  │ "Let's pivot. We need global   │  │
│  │ talent pools with local..."    │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 📝 Scene 4: The Summary (Quick Info)

**Context:** User just wants the TL;DR.

1.  **Action:** User clicks **[ 📝 Summarize ]**.
2.  **Result:** A gray card appears with a clean, markdown-formatted list.

```text
┌──────────────────────────────────────┐
│  XYZ 369 Decoder                     │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │ Summary                        │  │
│  ├────────────────────────────────┤  │
│  │ • Remote work is permanent.    │  │
│  │ • Commercial real estate drop. │  │
│  │ • Opportunity for rezoning.    │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 🛑 Scene 5: Error Handling (The Safety Net)

**Context:** The page has no text (e.g., a pure image site) or the API fails.

1.  **Action:** User attempts analysis.
2.  **Result:** Red error card appears with specific guidance.

```text
┌──────────────────────────────────────┐
│  XYZ 369 Decoder                     │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │ ❌ Error                       │  │
│  │ No text content found on this  │  │
│  │ page. Try an article.          │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```
