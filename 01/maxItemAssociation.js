function maxItemAssociation(array) {
    let recommendationGroups = [];

    for (let i = 0; i < array.length; i++) {
        let goodsList = array[i];

        for (let j = 0; j < goodsList.length; j++) {
            // skip if we added first good from first list
            if (i === 0 && j > 0) {
                break;
            }

            let good = goodsList[j];
            let shouldAddNewSet = true;

            for (let k = 0; k < recommendationGroups.length; k++) {
                if (recommendationGroups[k].has(good)) {
                    recommendationGroups[k] = new Set([ ...recommendationGroups[k], ...goodsList ]);
                    shouldAddNewSet = false;
                }
            }

            if (shouldAddNewSet) {
                recommendationGroups.push(new Set(goodsList));
            }
        }
    }

    // sorting by alphabet
    recommendationGroups = recommendationGroups.map(item => new Set(Array.from(item).sort()));

    const longestRecommendationGroup = recommendationGroups.reduce((acc, item) =>
        acc.size > item.size ? acc : item, []
    );

    return Array.from(longestRecommendationGroup);
}
