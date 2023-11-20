import express from "express"
import { UserService } from "../../service/user-service"

const router = express.Router()
const service = new UserService()

router.post("/", async (req, res) => {
  try {
    await service.createUser(req.body)
    res.status(201).json({})
  } catch (err) {
    res.status(403).send(err)
  }
})

router.get("/:username", async (req, res) => {
  try {
    const user = await service.readUser(req.params.username)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).send(err)
  }
})

router.put("/:username", async (req, res) => {
  try {
    if (req.params.username !== req.body.username) {
      res.status(403).send("The username in parameter is different from the one in body.")
      return;
    }
    await service.updateUser(req.body)
    res.status(200).json({})
  } catch (err) {
    res.status(404).send(err)
  }
})

router.delete("/:username", async (req, res) => {
  try {
    await service.deleteUser(req.params.username)
    res.status(200).json({})
  } catch (err) {
    res.status(404).send(err)
  }
})

export default router
