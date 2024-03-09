import { InfluxDB, Point } from '@influxdata/influxdb-client';
import 'dotenv/config';

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;
// const projectID = process.env.PROJECT_ID;

const timeoutMs = 10000;
const influxDB = new InfluxDB({ url, token, timeout: timeoutMs });

const writeApi = influxDB.getWriteApi(org, bucket);

const measurementName = 'metrics';

const metricsController = {};

metricsController.getData = async (req, res, next) => {
  const { userID, serverID } = req.body;

  const query = `
    from(bucket:"${bucket}")
    |> range(start: 0)
    |> filter (fn: (r) => r.userID == "${userID}" and r.serverID == "${serverID}")
  `;

  try {
    const queryApi = influxDB.getQueryApi(org);

    const result = await queryApi.queryRaw(query);

    // to send back result
    console.log('result from metricsController.getData, ', result);
    return next();
  } catch (err) {
    console.log('error getting data from metricsController.getData ', err);
    return next();
  }
};

metricsController.postData = async (req, res, next) => {
  console.log('entered metricsController.postData');
  const {
    userID,
    serverID,
    firstContentfulPaint,
    speedIndex,
    totalBlockingTime,
    largestContentfulPaint,
    cumulativeLayoutShift,
    performance,
  } = req.body;
  console.log('req.body ', req.body);
  console.log(
    userID,
    serverID,
    firstContentfulPaint,
    speedIndex,
    totalBlockingTime,
    largestContentfulPaint,
    cumulativeLayoutShift,
    performance
  );

  try {
    console.log('in metricsController');
    // create a point by calling the Point method
    const point = new Point(measurementName)
      .tag('userID', userID)
      .tag('serverID', serverID)
      .floatField('first-contentful-paint', firstContentfulPaint) // saved in milliseconds but to display in seconds
      .floatField('speed-index', speedIndex) // saved in milliseconds but to display in seconds
      .floatField('total-blocking-time', totalBlockingTime) // saved in milliseconds but to display in seconds
      .floatField('largest-contentful-paint', largestContentfulPaint) // saved in milliseconds; display in milliseconds
      .floatField('cumulative-layout-shift', cumulativeLayoutShift) // saved in milliseconds but to display in seconds
      .floatField('performance', performance) // no unit
      .timestamp(new Date());

    console.log(` ${point}`);

    await writeApi.writePoint(point);

    writeApi.close().then(() => {
      console.log('WRITE FINISHED in metricsController.postData');
      return next();
    });
  } catch (err) {
    console.log('error writing data in metricsController.postData ', err);
    return next();
  }
};

export default metricsController;
