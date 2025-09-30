houseBlueprint = new Object({
    address: '',
    date: new Date(),
    description: '',
    owner: '',
    size: 0,
    _averageBuildSpeed: 0.5,
    getDaysToBuild: function() {
        return this.size / this._averageBuildSpeed;
    }
})

function HouseBuilder(address, description, owner, size, roomCount) {
    let house = Object.create(houseBlueprint);
    house.address = address;
    house.description = description;
    house.owner = owner;
    house.size = size;
    house.roomCount = roomCount;
    return house;
}