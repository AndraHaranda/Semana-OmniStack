const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueid')

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*')

        return response.json(ongs)
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body

        const id = generateUniqueId()

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const id = request.headers.authorization

        const ong = await connection('ongs')
            .where('id', id)
            .select('id')
            .first()

        if (!ong) {
            return response.status(404).json({error: "ONG Not Found."})
        }

        await connection('incidents')
            .where('ong_id', ong.id)
            .delete()

        await connection('ongs')
            .where('id', id)
            .delete()

        return response.send()
    }
}