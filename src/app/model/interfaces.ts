export interface SearchCombinaisonCommand {
  shopId: number;
  amount: number;
}

export interface SearchCombinaisonResult {
  equal?: SearchCombinaisonResultItem;
  floor?: SearchCombinaisonResultItem;
  ceil?: SearchCombinaisonResultItem;
}

export interface SearchCombinaisonResultItem {
  value: number;
  cards: number[];
}
