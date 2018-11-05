class BusArrival{
    constructor(vehicleId,timeToStation,lineName,towards){
        this.vehicleId = vehicleId;
        this.timeToStation = timeToStation;
        this.lineName = lineName;
        this.towards = towards;
    }
}

// export let busArrival = new BusArrival ()
exports.BusArrival = BusArrival