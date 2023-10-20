import axios from "axios"
import { BigNumber, ethers } from "ethers"
import { ETHER_GASSTATION_API } from "../../utils/constant"
import { EvmGasObject } from "../../type/interface"

class Util {
    /**
     * 
     * @param amount 
     * @returns {BigNumber}
     */
    static gweiToWei = (amount: string | number): BigNumber => {
        const weiValue = ethers.utils.parseUnits(amount.toString(), 'gwei')
        return weiValue
    }
    
    /**
     * 
     * @param amount 
     * @returns {String}
     */
    static gweiToEther = (amount: string | number): string => {
        const weiValue = ethers.utils.parseUnits(amount.toString(), 'gwei')
        const etherValue = ethers.utils.formatEther(weiValue)
    
        return etherValue
    }
    
    /**
     * 
     * @param amount 
     * @returns {String}
     */
    static weiToEther = (amount: string | number): string => {
        const etherValue = ethers.utils.formatEther(amount.toString())
        return etherValue
    }

    /**
     * 
     * @returns {EvmGasObject}
     */
    static getGas = async (): Promise<EvmGasObject> => {
        try {
            const gasResponse = await axios.get(ETHER_GASSTATION_API)
            const estimatedGas =  gasResponse.data
    
            const low = Number(estimatedGas.safeLow / 10)
            const average = Number(estimatedGas.average / 10)
            const fast = Number(estimatedGas.fast / 10)
            const lowWei = await this.gweiToWei(low)
            const averageWei = await this.gweiToWei(average)
            const fastWei = await this.gweiToWei(fast)
            const lowEth = await this.gweiToEther(low)
            const averageEth = await this.gweiToEther(average)
            const fastEth = await this.gweiToEther(fast)
            const safeLowWaitMin = estimatedGas.safeLowWait;
            const avgWaitMin = estimatedGas.avgWait;
            const fastWaitMin = estimatedGas.fastWait;
    
            return {
                low,
                average,
                fast,
                lowWei,
                averageWei,
                fastWei,
                lowEth,
                averageEth,
                fastEth,
                safeLowWaitMin,
                avgWaitMin,
                fastWaitMin
            }
        }
        catch (error) {
            throw error
        }
    }

    /**
     * 
     * @param rpcURL 
     * @returns {Number}
     */
    static getJsonRPCLatency = async (rpcURL: string): Promise<number> => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(rpcURL)
            const before = Date.now()
            
            await provider.getBlock('latest')

            const after = Date.now()
            
            return after - before
        }
        catch(error) {
            throw error
        }
    }

    /**
     * 
     * @param rpcURL 
     * @returns {Number}
     */
    static getWebSocketRPCLatency = async (rpcURL: string): Promise<number> => {
        try {
            const provider = new ethers.providers.WebSocketProvider(rpcURL)
            const before = Date.now()
            
            await provider.getBlock('latest')

            const after = Date.now()
            
            return after - before
        }
        catch(error) {
            throw error
        }
    }
}

export default Util