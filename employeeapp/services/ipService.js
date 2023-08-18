const ip = require("ip");

module.exports = {
  ipAddress: async (empClockInIp) => {
    empClockInIp = ip.address();
    return { empClockInIp };
  },
};
