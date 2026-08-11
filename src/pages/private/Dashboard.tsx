import {
  ChartPieIcon,
  DocumentCheckIcon,
  PlusIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import { WalletIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import userIcon from "../../assets/userIcon.png";
import TaskCard from "../../components/TaskCard";
import Card from "../../components/Card";
import Progress from "../../components/Progress";
import Avtar from "../../components/Avtar";
import { useAuth } from "../../context/AuthContext";
import { useTaskModal } from "../../context/TaskModalContext";
import { useTasks } from "../../hooks/Tasks";
function Dashboard() {
  const {data} = useTasks();
  const {user} = useAuth();
  const {openTaskModal} = useTaskModal();
  let uname = user?.user_metadata?.full_name ?? "Test";
  let uName = (uname.split(" ")[0]);
  let completed = data?.filter((item)=>item.status==="Completed");
  let inProces = data?.filter((item)=>item.status==="InProgress");
  let pending = data?.filter((item)=>item.status==="NoStarted");

  let total = data?.length;
  let tcomp = completed && total ?Math.round(((completed?.length)/total)*100):0;
  let tprocs = inProces && total ?Math.round(((inProces?.length)/total)*100):0;
  let tpend = pending && total ?Math.round(((pending?.length)/total)*100):0;

  if(data){
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col gap-1 px-2 sm:px-4">
      <section className="flex shrink-0 flex-col gap-1 md:gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-gray-800 mb-2 sm:text-2xl capitalize">
          Welcome back,{uName}👋
        </h1>
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2 overflow-hidden">
            {[1, 2, 3, 4].map((key) => (
              <Avtar key={key} imgsrc={userIcon} pending={null}/>
            ))}
            </div>
          </div>
          <Button className="flex items-center bg-todo-light text-todo-primary border-todo-primary rounded-sm py-1 md:py-1.5">
            <UserPlusIcon className="w-3 h-3 scale-x-[-1]" />
            Invite
          </Button>
        </div>
      </section>
      <section className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="grid min-h-full grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="order-2 flex min-w-0 flex-col text-[11px] text-gray-400 lg:order-1 min-h-full shadow-md rounded-md p-3 sm:text-xs">
            <div className="flex flex-col gap-1">
              <div className="flex w-full  items-center justify-between">
                <span className="flex">
                  <WalletIcon className="w-4 h-4" />
                  <span className="text-todo-primary">To Do</span>
                </span>
                <span className="flex cursor-pointer" onClick={()=>openTaskModal()}>
                  <PlusIcon className="w-4 h-4 text-todo-primary" />
                  Add Task
                </span>
              </div>
              <div>
                <span>Today</span>
              </div>

              {/* Cards section */}
              <div className="flex flex-col p-2 gap-2 sm:p-4">
                {/* Single Card */}
                {data?.map((item,key) => (
                  <TaskCard key={key} taskData={item} />
                ))}
                {/* SIngle Card */}
              </div>
            </div>
          </div>

          <div className="order-1 flex min-w-0 flex-col lg:order-2 min-h-full text-[11px] gap-3 sm:text-xs">
            <Card className="text-gray-400 border-none shadow-md w-full h-auto shrink-0 p-3">
              <span className="flex gap-1">
                <ChartPieIcon className="w-4 h-4" />
                <span className="text-todo-primary">Task Status</span>
              </span>
              <div className="flex flex-wrap items-center justify-center sm:gap-1 md:gap-2 lg:gap-4 py-2 lg:py-4 md:px-4 lg:px-6 sm:justify-between">
                    <Progress key={1} color="text-green-500" size={100} caption="Completed" value={tcomp} /> 
                    <Progress key={2} color="text-blue-500" size={100} caption="InProgress" value={tprocs} /> 
                    <Progress key={3} color="text-red-500" size={100} caption="NoStarted" value={tpend} /> 
              </div>
            </Card>
            <Card className="text-gray-400 border-none shadow-md w-full flex-1 min-h-0 p-3">
                 <span className="flex gap-1">
                <DocumentCheckIcon className="w-4 h-4" />
                <span className="text-todo-primary">Task Completed</span>
              </span>
               <div className="flex flex-col p-2 gap-2 sm:p-4">
                {/* Single Card */}
                {completed?.map((item,key) => (
                  <TaskCard key={key} taskData={item} />
                ))}
                {/* SIngle Card */}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
