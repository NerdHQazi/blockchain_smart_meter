const ethers = require("ethers")
const fs = require("fs-extra")
async function main() {

    const provider = new ethers.providers.JsonRpcProvider("http://172.23.144.1:7545") 
    const wallet = new ethers.Wallet("0x05c2b306c64c1ee45591d7d83d9605e9c222d5406c832314a306ae3d38504408" , provider)

    // Deploy Enaira Token Contract
    const name = "Enaira"
    const symbol = "ENR"
    const totalSupply = ethers.utils.parseEther("100")

    const eNairaAbi = fs.readFileSync("./Enaira_sol_Enaira.abi", "utf-8");
    const eNairaBinary = fs.readFileSync("./Enaira_sol_Enaira.bin", "utf-8");

    const eNairaContractFactory = new ethers.ContractFactory(eNairaAbi,eNairaBinary,wallet)
    console.log("Deploying Enaira Token, please wait ...")
    const eNairaContract = await eNairaContractFactory.deploy(name, symbol, totalSupply , {
        gasLimit: 5000000
    })
    
    
    await eNairaContract.deployed()
    console.log("Enaira Token deployed at:", eNairaContract.address)
    

    const smartMeterAbi = fs.readFileSync("./SmartMeter_sol_SmartMeter.abi" , "utf-8")
    const smartMeterBinary = fs.readFileSync("./SmartMeter_sol_SmartMeter.bin","utf-8")

    const smartMeterContractFactory = new ethers.ContractFactory(smartMeterAbi ,smartMeterBinary , wallet)
    console.log("Deploying SmartMeter, please wait ...")
    const smartMeterContract = await smartMeterContractFactory.deploy(eNairaContract.address, {
        gasLimit: 5000000
    })
    await smartMeterContract.deployed()
    console.log("Smart Meter deployed at:", smartMeterContract.address)


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })