export const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    trailingZeroDisplay: 'stripIfInteger'
})


export const isEmpty = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }