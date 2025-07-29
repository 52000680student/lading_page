import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f57a26 0%, #e6621e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          MedNova
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'white',
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'white',
            textAlign: 'center',
            opacity: 0.8,
            marginTop: 20,
          }}
        >
          Lấy Mẫu Tại Nhà • Kết Quả Chính Xác • Tư Vấn 24/7
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
