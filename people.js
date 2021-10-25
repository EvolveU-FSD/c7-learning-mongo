const { ObjectId } = require('bson')
const db = require('./db')

async function createPerson(personData) {
    let peopleCollection = await db.getCollection('people')
    let insertResult = await peopleCollection.insertOne(personData)
    return insertResult.insertedId.id
}

async function findPersonById(id) {
    let peopleCollection = await db.getCollection('people')
    let person = await peopleCollection.findOne({_id: ObjectId(id)})
    return person
}

async function findPersonByFirstName(name) {
    let peopleCollection = await db.getCollection('people')
    let person = await peopleCollection.findOne({firstName: name})
    return person
}

async function updatePerson(id, newData) {
    let peopleCollection = await db.getCollection('people')
    return peopleCollection.updateOne({ _id: ObjectId(id) }, { $set: newData })
}

async function deletePersonById(id) {
    let peopleCollection = await db.getCollection('people')
    return peopleCollection.deleteOne({_id: ObjectId(id)})
}

async function test() {
    let foundPerson = await findPersonByFirstName('Al')
    console.log('Found person by name:', foundPerson)

    let foundPersonById = await findPersonById("6176cf95311841dd777aeb3f")
    console.log('Found person by id:', foundPersonById)

    let jenId = await createPerson({
        firstName: "Jennifer", 
        lastName: "Morrison", 
        age: 29, 
        favoriteFood: "pizza, no pineapple please"
    })
    console.log('Created Jen with id', jenId)

    let readbackJen = await findPersonById(jenId)
    console.log('Found Jen to be', readbackJen)

    await updatePerson(jenId, {favoriteFood: 'Shawarmco'})
    console.log('Updated Jens favorite food')

    readbackJen = await findPersonById(jenId)
    console.log('Now Jen is', readbackJen)

}

test()