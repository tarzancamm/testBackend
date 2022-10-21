// Connects motivators database
const motivators = require('./db.json')

// Holds all backend endpoint functionality
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ['A good time to finish up old tasks.', 'A new perspective will come with the new year.', 'Be careful or you could fall for some tricks today.', 'Chance favors those in motion.', 'Disbelief destroys the magic.']

        // Grabs random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndex]

        // Sends response back to frontend
        res.status(200).send(randomFortune)
    },
    getAllMotivators: (req, res) => {
        res.status(200).send(motivators)
    },
    deleteMotivator: (req, res) => {
       const deleteId = req.params.id
       let index = motivators.findIndex(element => element.id === +deleteId)
        motivators.splice(index, 1)
        res.status(200).send(motivators)
    },
    createMotivator: (req, res) => {
        // Grab each body value and store to variable
        const {name, netWorth, image} = req.body

        let biggestId = -1

        // Loops through motivators database to find the biggest ID
        for(let i = 0; i < motivators.length; i++) {
            if(motivators[i].id > biggestId) {
                biggestId = motivators[i].id
            }
        }
        
        let nextId = biggestId + 1
        
        let newMotivator = {
            id: nextId,
            name: name,
            netWorth: +netWorth,
            image: image
        }

        motivators.push(newMotivator)
        res.status(200).send(motivators)
    },
    updateMotivator: (req, res) => {
        let type = req.body.type
        let id = req.params.id
        let index = motivators.findIndex(element => element.id === +id)

        if (type === 'plus') {
            motivators[index].netWorth += 50000
        } else if (type === 'minus') {
            motivators[index].netWorth -= 50000
        } else {
            res.sendStatus(400)
        }
        res.status(200).send(motivators)
    }
}