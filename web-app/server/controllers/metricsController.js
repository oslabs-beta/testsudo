import { InfluxDB, Point } from '@influxdata/influxdb-client';
import 'dotenv/config';

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const influxDB = new InfluxDB({ url, token });

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

  try {
    // create a point by calling the Point method
    const point = new Point(measurementName)
      .tag('userID', userID)
      .tag('serverID', serverID)
      .floatField('first-contentful-paint', firstContentfulPaint)
      .floatField('speed-index', speedIndex)
      .floatField('total-blocking-time', totalBlockingTime)
      .floatField('largest-contentful-paint', largestContentfulPaint)
      .floatField('cumulative-layout-shift', cumulativeLayoutShift)
      .floatField('performance', performance)
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