import sdk from './1-initialize-sdk.js';

// MEMBER NFT ADDRESS
const editionDrop = sdk.getEditionDrop("0x101D31a4f5673e6766C53eE82852f4080C3Ad137");

const token = sdk.getToken('0xaA9C4527DBfd8447036Efe126Cdc65C49773c373');

(async () => {
    try {
        //find addresses who own our membership NFT
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length === 0) {
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }
        // Loop through the array of addresses.
        const airdropTargets = walletAddresses.map((address) => {
            // Pick a random # between 1000 and 10000.
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
    
            // Set up the target.
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
    
            return airdropTarget;
        });
        
        
        // Call transferBatch on all our airdrop targets.
        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
        
    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();