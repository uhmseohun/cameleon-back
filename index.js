import app from '@/app'
import dotenv from 'dotenv'

dotenv.config('.env')

app.listen(process.env.port, () => {
  console.log(`포트 ${process.env.port}에서 실행 중`)
})
