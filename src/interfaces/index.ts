
 export interface ERC20Token {
    token_address: string;
    symbol: string;
    decimals: number;
};


export interface ERC20TokenWithBalance {
    token_address: string;
    symbol: string;
    decimals: number;
    token_balance: string
};
