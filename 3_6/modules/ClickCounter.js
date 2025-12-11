export const createClickCounter = (maxClicks = 5) => {
    let clickCount = 0;
    
    return {
        increment: () => {
            if (clickCount < maxClicks) {
                clickCount++;
                return {
                    count: clickCount,
                    remaining: maxClicks - clickCount,
                    canClick: clickCount < maxClicks
                };
            }
            return {
                count: clickCount,
                remaining: 0,
                canClick: false
            };
        },
        getCount: () => clickCount,
        getRemaining: () => maxClicks - clickCount,
        canClick: () => clickCount < maxClicks,
        reset: () => {
            clickCount = 0;
        }
    };
};

export const updateButtonText = (button, counter, originalText) => {
    const remaining = counter.getRemaining();
    if (remaining > 0) {
        button.textContent = `${originalText} (${remaining} залишилось)`;
    } else {
        button.textContent = `${originalText} (0 залишилось)`;
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
    }
};