function getLocalTime(nS) {
    return new Date(parseInt(nS, 10)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

function formatDate(text) {
    const timeDiffer = text;
    //计算出相差天数
    const days = Math.floor(timeDiffer / (24 * 3600 * 1000));
    const remainder1 = timeDiffer % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    //计算出小时数
    const hours = Math.floor(remainder1 / (3600 * 1000));
    const remainder2 = remainder1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    //计算相差分钟数
    const minutes = Math.floor(remainder2 / (60 * 1000));
    const remainder3 = remainder2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    //计算相差秒数
    const seconds = Math.round(remainder3 / 1000);

    const daysText = days ? days + '天' : '';
    const hoursText = hours ? hours + '小时' : '';
    const minutesText = minutes ? minutes + '分钟' : '';
    const secondsText = seconds ? seconds + '秒' : '';

    if (!daysText && !hoursText && !minutesText && !secondsText) {
        return '--';
    }
    return daysText + hoursText + minutesText + secondsText;
}

export default { getLocalTime, formatDate };
