import moment from 'moment';
Date.prototype.formatTime = function (formartType: string) {
    return moment(this).format(formartType);
}