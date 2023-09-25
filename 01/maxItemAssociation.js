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
          recommendationGroups[k] = new Set([...recommendationGroups[k], ...goodsList]);
          shouldAddNewSet = false;
        }
      }

      if (shouldAddNewSet) {
        recommendationGroups.push(new Set(goodsList));
      }
    }
  }

  let longestRecommendationGroups = recommendationGroups.reduce((acc, item) => {
    if (item.size > acc[0].size) {
      acc = [item];
    }

    if (item.size === acc[0].size) {
      acc.push(item);
    }

    return acc;
  }, [new Set()]);

  return longestRecommendationGroups.reduce((acc, item, index) => {
    const sortedRecommendationGroup = Array.from(item).sort();

    if (index === 0) {
      return sortedRecommendationGroup;
    }

    if (sortedRecommendationGroup[0] < acc[0]) {
      return sortedRecommendationGroup;
    }

    return acc;
  }, []);
}

module.exports = maxItemAssociation;
