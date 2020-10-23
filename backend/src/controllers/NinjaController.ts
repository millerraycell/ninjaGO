import {Request, Response, NextFunction} from 'express';
import Ninja from '../models/NinjaModel';
import ninjas_view from '../view/ninjas_view';

export default {
    async index(request: Request, response: Response, next: NextFunction){

        const coordendas = [request.query.latitude as string, request.query.longitude as string]

        await Ninja.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(coordendas[0]),parseFloat(coordendas[1])]
                    },
                    distanceField: "dist.calculated",
                    maxDistance: 100000, //distancia em metros
                    includeLocs: "dist.location",
                    spherical: true
                }           
            }
        ]).then(function(ninja){
            return response.status(200).send(ninjas_view.renderMany(ninja))
        }).catch(next)

    },

    async show(request: Request, response: Response, next: NextFunction){
        await Ninja.find().then(function(ninja){
            return response.status(200).send(ninja)
        })
    },

    async create(request: Request, response: Response, next: NextFunction){
        const {
            name,
            rank,
            available,
            latitude,
            longitude
        } = request.body

        console.log(request.body)

        const ponto = {
            type: "Point",
            coordinates: [latitude, longitude]
        };

        await Ninja.create({
            name,
            rank,
            available,
            geometry: ponto
        }).then(function(data){
            return response.status(201).send(data)
        }).catch(next)

    },

    async update (request: Request, response: Response, next: NextFunction){
        const dados = request.body;
        const id = request.params.id;

        return await Ninja.findByIdAndUpdate(id, dados)
                .then(function(ninjaAntigo){
                    Ninja.findOne({_id: request.params.id})
                        .then(function(ninjaNovo){
                            response.send(ninjaNovo);
                        })
        }).catch(next)
    },

    async delete(request: Request, response:Response, next: NextFunction){     
        return await Ninja.findByIdAndRemove({_id: request.params.id}).then((ninja)=>{
            response.send(ninja);
        }).catch(next)
    }
}