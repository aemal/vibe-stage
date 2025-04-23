# 🎤 VibeStage – Bring Remote Energy to the Room

**VibeStage** is an open-source real-time communication wall for hybrid workshops and conferences. It brings online participants to the physical venue with text, voice, and video messages projected live on a big screen — blending digital presence with real-world vibes.

---

## 🚀 Features

- 💬 **Live Text Comments**  
  Real-time messages from remote participants appear instantly on a big screen with country tags, emojis, and smooth CSS animations.

- 🌍 **Location Awareness**  
  Each message shows the country of origin, fostering global connection.

- 🔊 **Voice Messages**  
  Remote participants can leave short voice recordings for moderators to play aloud in the room.

- 🎥 **Video Questions**  
  Moderators can review and project asynchronous video clips from online attendees.

- 📞 **Live Remote Call-Ins**  
  With one click, bring someone from online "on stage" to speak live via WebRTC (powered by Agora).

- 🧑‍💼 **Moderator Dashboard**  
  Manage messages, queue voice/video, and approve live speaker requests.

- 🖥️ **Big Screen Mode**  
  Beautifully animated fullscreen projection of messages, perfect for workshop venues.

---

## 🛠 Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Hero UI](https://www.heroui.com/) (optional)
- **Backend:** [Firebase](https://firebase.google.com/) (Auth, Firestore, Functions)
- **Live Calls:** [Agora](https://www.agora.io/) SDK for real-time voice/video
- **Realtime:** Firebase listeners + WebRTC
- **Deployment:** [Vercel](https://vercel.com/) or Firebase Hosting
- **Vibe Coding:** To make sure we build it within 10 hours and use it in the workshop on 3rd May.
---

## 🧑‍💻 Getting Started

```bash
git clone https://github.com/aemal/vibestage.git
cd vibestage
bun install
bun run dev
```

⚠️ Set up your Firebase and Agora credentials. Rename .env.example to .env.local and fill in your keys.

## 📂 Project Structure

```
/components
  /BigScreenView      → Projected live view
  /ModeratorDashboard → Admin interface
  /RemoteClient       → Remote user view

/pages
  /submit             → Public message submission UI
  /moderator          → Admin/mod view
  /screen             → Big screen real-time display

/lib
  firebase.ts         → Firebase config & utilities
  agora.ts            → Agora call handlers

/public
  /media              → Static assets
```

## 🧠 Use Cases

- Hybrid workshops
- Global webinars
- Live panels and Q&A
- Community town halls
- Online/offline hackathons

## ❤️ Vision

VibeStage exists to amplify online voices at real-world events.
It's not just a comment wall — it's a live stage for everyone, everywhere.

We believe that hybrid gatherings shouldn't feel like two disconnected rooms. With VibeStage, remote participants are front and center — heard, seen, and celebrated.

## 📄 License

MIT License — Fork it. Remix it. Launch your vibe.

Built with love by the community 🌐✨ 