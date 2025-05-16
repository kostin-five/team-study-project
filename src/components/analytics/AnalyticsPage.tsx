import React, { useState } from "react";
import { Radio } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { loadTaskEvents, loadTestEvents } from "../../utils/storage";

dayjs.extend(isoWeek);

type PeriodType = "day" | "week" | "month" | "year";

interface DataPoint {
  period: string;
  tasks: number;
  tests: number;
}

const AnalyticsPage: React.FC = () => {
  const [period, setPeriod] = useState<PeriodType>("day");
  const taskEvents = loadTaskEvents();
  const testEvents = loadTestEvents();

  const generateData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const now = dayjs();
    if (period === "day") {
      // Last 7 days including today
      for (let i = 6; i >= 0; i--) {
        const day = now.subtract(i, "day");
        const label = day.format("DD.MM");
        const dayStart = day.startOf("day").valueOf();
        const dayEnd = day.endOf("day").valueOf();
        const tasksCount = taskEvents.filter(
          (ts) => ts >= dayStart && ts <= dayEnd
        ).length;
        const testsCount = testEvents.filter(
          (ts) => ts >= dayStart && ts <= dayEnd
        ).length;
        data.push({ period: label, tasks: tasksCount, tests: testsCount });
      }
    } else if (period === "week") {
      // Last 7 weeks (current week included)
      for (let i = 6; i >= 0; i--) {
        const week = now.subtract(i, "week");
        const year = week.isoWeekYear();
        const weekNum = week.isoWeek();
        const label = `W${weekNum}-${year}`;
        const weekStart = week.startOf("week").valueOf();
        const weekEnd = week.endOf("week").valueOf();
        const tasksCount = taskEvents.filter(
          (ts) => ts >= weekStart && ts <= weekEnd
        ).length;
        const testsCount = testEvents.filter(
          (ts) => ts >= weekStart && ts <= weekEnd
        ).length;
        data.push({ period: label, tasks: tasksCount, tests: testsCount });
      }
    } else if (period === "month") {
      // Last 12 months (including current month)
      for (let i = 11; i >= 0; i--) {
        const month = now.subtract(i, "month");
        const label = month.format("MM.YY");
        const monthStart = month.startOf("month").valueOf();
        const monthEnd = month.endOf("month").valueOf();
        const tasksCount = taskEvents.filter(
          (ts) => ts >= monthStart && ts <= monthEnd
        ).length;
        const testsCount = testEvents.filter(
          (ts) => ts >= monthStart && ts <= monthEnd
        ).length;
        data.push({ period: label, tasks: tasksCount, tests: testsCount });
      }
    } else if (period === "year") {
      // Last 5 years (including current year)
      const currentYear = now.year();
      for (let y = currentYear - 4; y <= currentYear; y++) {
        const yearStart = dayjs(`${y}-01-01`).startOf("year").valueOf();
        const yearEnd = dayjs(`${y}-12-31`).endOf("year").valueOf();
        const tasksCount = taskEvents.filter(
          (ts) => ts >= yearStart && ts <= yearEnd
        ).length;
        const testsCount = testEvents.filter(
          (ts) => ts >= yearStart && ts <= yearEnd
        ).length;
        data.push({
          period: y.toString(),
          tasks: tasksCount,
          tests: testsCount,
        });
      }
    }
    return data;
  };

  const chartData = generateData();

  return (
    <div>
      <h2>Аналитика</h2>
      <Radio.Group
        value={period}
        onChange={(e) => setPeriod(e.target.value as PeriodType)}
        style={{ marginBottom: "16px" }}
      >
        <Radio.Button value="day">День</Radio.Button>
        <Radio.Button value="week">Неделя</Radio.Button>
        <Radio.Button value="month">Месяц</Radio.Button>
        <Radio.Button value="year">Год</Radio.Button>
      </Radio.Group>
      <div style={{ maxWidth: "800px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tasks"
              name="Задачи"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="tests"
              name="Тесты"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
