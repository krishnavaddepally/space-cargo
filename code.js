let cargoHold = {
  cleaned: false,
  daysSinceLastIncident: 3,
  fuel: 0,
  hyperdrive: null,
	  recyclables: [],
	  toolBin: {
	    label: "Primary Tool Bin",
	    tools: []
	  },
	  robotsForSale: [],
	  dilithiumOreWeight: 0,
	  trash: [],

	  toggleCleanedStatus() {
	  this.cleaned= !this.cleaned
    return this.cleaned
	  },


      addDayForIncidentReport(){
        this.daysSinceLastIncident +=1
        return this.daysSinceLastIncident
	  },

	  consolidateFuel() {


	   this.fuel = fuelCanisterPile.reduce((total, canister) => {
	      return total + canister
     })
	  },

	  retrieveWorkingHyperdrive(hyperDrivePile) {
	    let isNotRusty = (hyperdrive) => {return !hyperdrive.toLowerCase().includes("rusty")}

	    this.hyperdrive = hyperDrivePile.find(isNotRusty)
	  },

	  filterOutRecyclables(recyclablesPile) {
	    let isRecyclable = (item) => {
	      let keyWords = ["paper", "plastic", "glass", "metal can"]
	      let ans = false

      keyWords.forEach((word) => {
	        if (item.includes(word)) {
	          ans = true
	        }
	      })

	      return ans
	    }

	    this.recyclables = recyclablesPile.filter(isRecyclable)
	  },

	  consolidateTools(oldToolBinsPile) {
	    oldToolBinsPile.forEach((oldToolBin) => {
	      this.toolBin.tools = this.toolBin.tools.concat(oldToolBin.items)
	    })
	  },

	  filterRobots(robotsPile) {
	    let forSale = (robot) => {
	      if (robot.yearsOld <= 15) {
	        return true
	      }
	      else {
	        return false
        	      }
	    }

	    this.robotsForSale = robotsPile.filter(forSale)
	  },

	  consolidateOre(oresPile) {
	    oresPile.forEach((ore) => {
	      if (ore.status == "stable") {
	        this.dilithiumOreWeight += ore.weight
	      }
	      else {
	        this.trash.push(ore)
	      }
	    })
	  },

	  fuelUpRobots() {
	    this.robotsForSale.forEach((robot) => {
	      if (robot.fuel < 2) {
	        let diff = 2 - robot.fuel

	        robot.fuel = 2
	        this.fuel -= diff
	      }
	    })
	  }
	};

	let fuelCanisterPile = [2, 5, 9, 2, 3, 4, 6, 8, 8, 2, 1, 0]

	let hyperDrivePile = ["rusty hyperdrive", "millennium hyperdrive", "hyperdrive XL", "rusty hyperdrive", "rusty hyperdrive XL"]

	let recyclablesPile = ["paper", "space banana peel", "plastic", "plastic", "glass", "styrofoam coffee mug", "old dilithium battery", "metal can", "paper"]

let oldToolBinsPile = [
	 {
   label: "Tool Bin 1",
   items: []
	 },
	 {
	   label: "Tool Bin 2",
	   items: ["flux capicitor wrench", "hydrospanner", "android eye scanner", "skeleton key-card"]
	 },
	 {
	   label: "Tool Bin 3",
	   items: []
	 },
	 {
	   label: "Tool Bin 4",
	   items: ["transponder", "body scanner"]
	 },
	 {
	   label: "Tool Bin 5",
	   items: ["multi-pass", "sonic screwdriver", "teleporter gun"]
	 }
	]

	let robotsPile = [
	  {
	    robotType: "Protocol Droid",
	    yearsOld: 41,
	    fuel: 0
	  },
	  {
	    robotType: "Astromech Droid",
	    yearsOld: 3,
	    fuel: 2
	  },
	  {
	    robotType: "Maintenance Droid",
	    yearsOld: 10,
	    fuel: 1
	  },
	  {
	    robotType: "Bending Robot",
	    yearsOld: 19,
    fuel: 0
	  }
	]

	let orePile = [
	  {
	    status: "glowing",
	    weight: 20.5
	  },
	  {
	    status: "stable",
	    weight: 15.5
	  },
	  {
	    status: "stable",
	    weight: 4.5
	  },
	  {
	    status: "glowing",
	    weight: 0.5
	  }
	]

	// executed code here

	//part 1
	cargoHold.toggleCleanedStatus()
	console.log("cleaned: " + cargoHold.cleaned)

	//part 2
	cargoHold.addDayForIncidentReport()
	console.log("days since last incident: " + cargoHold.daysSinceLastIncident)

	//part 3
	cargoHold.consolidateFuel(fuelCanisterPile)
	console.log("fuel: " + cargoHold.fuel)

	//part 4
	cargoHold.retrieveWorkingHyperdrive(hyperDrivePile)
	console.log("hyperdrive: " + cargoHold.hyperdrive)

	//part 5
	cargoHold.filterOutRecyclables(recyclablesPile)
	console.log("recyclables: " + cargoHold.recyclables)
	//part 6
	cargoHold.consolidateTools(oldToolBinsPile)
	console.log("tools: " + cargoHold.toolBin.tools)

	//part 7
	cargoHold.filterRobots(robotsPile)
	console.log("robots for sale: " + cargoHold.robotsForSale)

	//part 8
	cargoHold.consolidateOre(orePile)
	console.log("dilithium ore weight: " + cargoHold.dilithiumOreWeight)
	console.log("trash: " + cargoHold.trash)

	//bonus
	cargoHold.fuelUpRobots()
	console.log("robots for sale: " + cargoHold.robotsForSale)
	console.log("fuel remaining: " + cargoHold.fuel)
