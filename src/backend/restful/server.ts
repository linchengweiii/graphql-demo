import express from "express"
import userRouter from "./router/user"

export const startRestfulServer = () => {
  const app = express()
  const port = 8080

  app.use(express.json())

  app.use("/user", userRouter)

  app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
  })
}
