import SingleEvent from "@/components/Events/SingleEvent/SingleEvent";

import POST from "@/server_actions/POST";

export default async function Home({
  params,
}: {
  params: { eventId: string };
}) {
  const res = await POST("event/getEvent", { id: params.eventId });
  if (res) {
    console.log(res);
    return (
        <SingleEvent event={res.event} />
    );
  }
  else {
    return (
      <div>Event not found</div>
    )
  }
}
