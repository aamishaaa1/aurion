# Aurion Frontend

Frontend untuk Aurion Reality Integrity Engine - Collective Digital Immune System for AI.

## 🎨 Desain

Frontend ini dirancang sesuai dengan konsep Aurion:

### Konsep Utama
- **Immune System Analogy**: UI mencerminkan cara kerja sistem imun biologis
- **Multi-Agent Visualization**: Menampilkan hasil dari 5 AI agents secara jelas
- **Trust & Transparency**: Semua hasil verifikasi dapat diaudit
- **Decentralized Knowledge**: Integrasi dengan OriginTrail DKG

### Halaman Utama

#### 1. Homepage (`/`)
- Hero section dengan penjelasan konsep "Reality Integrity Engine"
- 3 pilar utama: Multi-Agent Consensus, Verifiable Knowledge, Economic Incentives
- Penjelasan 4 fase: Detection, Consensus, Verification, Accountability
- Call-to-action untuk verify dan publish

#### 2. Verify Page (`/verify`)
- Upload interface untuk Text, Image, dan Video
- Real-time verification dengan loading state
- Hasil consensus dari 5 agents
- Visualisasi confidence score dan agreement level
- Provenance chain information
- Tombol publish ke DKG

#### 3. Publish Page (`/publish`)
- Form untuk publish knowledge asset ke DKG
- Integrasi dengan OriginTrail
- UAL generation

#### 4. Identity Page (`/identity`)
- Lookup Polkadot identity
- Reputation scores
- Verification history

#### 5. Asset Detail (`/asset/[id]`)
- View published knowledge asset
- JSON-LD visualization
- Provenance chain explorer

## 🎯 Fitur

### Multi-Agent Visualization
- Setiap agent ditampilkan dengan emoji unik:
  - 🧠 Anthropic (Deep reasoning)
  - ⚡ Groq (Fast inference)
  - 🇪🇺 Mistral (European AI)
  - 🔍 Google (Multimodal)
  - 🚀 xAI (Real-time knowledge)

### Consensus Display
- Confidence score (0-100%)
- Agreement level (0-100%)
- Final verdict dengan color coding:
  - ✅ HIGH (green)
  - ⚠️ MODERATE (yellow)
  - ❌ LOW (red)

### Provenance Chain
- Content hash (SHA-256)
- Agent participation count
- Consensus status
- Timestamp
- Cryptographic signatures

## 🛠️ Teknologi

- **Next.js 15**: React framework dengan App Router
- **TypeScript**: Type safety
- **Custom CSS**: Styling tanpa framework (untuk menghindari masalah Tailwind)
- **CSS Variables**: Theme system yang konsisten

## 🚀 Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Struktur

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout dengan nav
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── verify/
│   │   └── page.tsx        # Verification page
│   ├── publish/
│   │   └── page.tsx        # Publish page
│   ├── identity/
│   │   └── page.tsx        # Identity lookup
│   └── asset/[id]/
│       └── page.tsx        # Asset detail
├── components/
│   ├── UploadInput.tsx     # File/text upload
│   ├── VerificationResult.tsx  # Results display
│   ├── ConsensusGraph.tsx  # Consensus visualization
│   └── ProvenanceTimeline.tsx  # Provenance chain
├── lib/
│   └── api.ts              # API client
└── package.json
```

## 🎨 Design System

### Colors
```css
--background: #ffffff (light) / #0a0a0a (dark)
--foreground: #0a0a0a (light) / #f9fafb (dark)
--primary: #3b82f6 (blue)
--success: #10b981 (green)
--warning: #f59e0b (orange)
--danger: #ef4444 (red)
--border: #e5e7eb (light) / #374151 (dark)
--card: #f9fafb (light) / #1f2937 (dark)
```

### Typography
- Font: System font stack (Apple, Segoe UI, Roboto)
- Headings: Bold, larger sizes
- Body: 1rem, line-height 1.6

### Components
- `.container`: Max-width 1200px, centered
- `.card`: Rounded, bordered, padded
- `.btn`: Rounded, hover effects
- `.badge`: Small, rounded pill

## 🔗 API Integration

Frontend berkomunikasi dengan backend melalui REST API:

```typescript
// Verify text
POST /api/verify/text
Body: { text: string }

// Verify image
POST /api/verify/image
Body: FormData with file

// Verify video
POST /api/verify/video
Body: FormData with file

// Publish to DKG
POST /api/publish
Body: { knowledgeAsset: object }

// Get asset
GET /api/asset/:ual

// Get identity
GET /api/identity/:address
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📝 Notes

- Frontend menggunakan custom CSS karena masalah kompatibilitas Tailwind dengan Next.js 15
- Semua styling menggunakan inline styles dan CSS classes untuk konsistensi
- Dark mode support melalui CSS media queries
- Responsive design dengan CSS Grid dan Flexbox

## 🎯 Future Improvements

- [ ] Add real-time updates via WebSocket
- [ ] Implement caching for verified content
- [ ] Add user authentication
- [ ] Create dashboard for analytics
- [ ] Add export functionality (PDF, JSON)
- [ ] Implement search and filtering
- [ ] Add comparison view for multiple verifications
- [ ] Create mobile app version
