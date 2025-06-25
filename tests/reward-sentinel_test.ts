import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.4/index.ts';

Clarinet.test({
    name: "Ensure the reward sentinel contract can create achievements",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall(
                'reward-sentinel', 
                'create-achievement', 
                [
                    types.ascii('Daily Learning'),
                    types.utf8('Track daily knowledge acquisition'),
                    types.uint(1),
                    types.none(),
                    types.uint(2),
                    types.uint(10)
                ],
                deployer.address
            )
        ]);

        block.receipts[0].result.expectOk();
    }
});

Clarinet.test({
    name: "Validate achievement completion and reward mechanism",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall(
                'reward-sentinel', 
                'complete-achievement', 
                [types.uint(1)],
                deployer.address
            )
        ]);

        block.receipts[0].result.expectOk();
    }
});