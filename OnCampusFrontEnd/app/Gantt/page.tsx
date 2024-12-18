import GanttPage from "@/components/AllEvents/Gantt";
import POST from "@/server_actions/POST";
import {Task} from "gantt-task-react-pro";


async function Gantt() {
  const res = await POST("event/getEvents", {});
  console.log(res);
  if (res) {
    console.log(res);
  }
  const tasks : Task[] = [];
  res.events.map((event: any) => {
    tasks.push({
      start: new Date(event.startDate),
      end: new Date(event.finishDate),
      name: event.title,
      id: event.id,
      type: "task",
      progress: 100,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    });
  });


  return (
    <div>
      <GanttPage tasks={tasks}/>
    </div>
  );
  
}

export default Gantt;
