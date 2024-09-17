const express = require('express')


const router = express.Router();
const { createWorkout, getAllWorkouts, getWorkout, delWorkout, updateWorkout } = require("../controllers/workoutControllers")


router.get("/", getAllWorkouts)


router.get("/:id", getWorkout)

router.post("/", createWorkout)

router.delete("/:id", delWorkout)

router.patch("/:id", updateWorkout)



module.exports = router