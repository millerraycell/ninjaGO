interface Ninja{
    id: string,
    name : string,
    available : boolean,
    rank : string,
    geometry: {
        type: string,
        coordinates: [number, number]
    }

};

export default{
    render(ninja: Ninja){
        return{
            id: ninja.id,
            name: ninja.name,
            rank: ninja.rank,
            available: ninja.available,
            latitude: ninja.geometry.coordinates[0],
            longitude: ninja.geometry.coordinates[1],
        }
    },

    renderMany(ninja: Ninja[]){
        return ninja.map(ninja=>this.render(ninja))
    }
}