const Workout = require('../models/workoutModels')
const mongoose = require("mongoose")

// get all workouts
const getAllWorkouts = (async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts);

})

//get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not a valid id" })
    }
    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "No such workout present" })
    }
    res.status(200).json(workout)


}

// post a workout
const createWorkout = (async (req, res) => {
    const { title, reps, load } = req.body;
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Pls fill all the fields", emptyFields })
    }

    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

//delete a workout
const delWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not a valid id" })
    }
    const workout = await Workout.findByIdAndDelete({ _id: id })
    if (!workout) {
        return res.status(404).json({ error: "No such workout present" })
    }
    res.status(200).json(workout)

}

//patch a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not a valid id" })
    }
    const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body })
    if (!workout) {
        return res.status(404).json({ error: "No such workout present" })
    }
    res.status(200).json(workout)

}




module.exports = {
    createWorkout, getAllWorkouts, getWorkout, delWorkout, updateWorkout
}