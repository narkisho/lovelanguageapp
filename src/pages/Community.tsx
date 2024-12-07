import { MainLayout } from "@/components/layout/MainLayout";
import { CreateTopicDialog } from "@/components/community/CreateTopicDialog";
import { TopicsList } from "@/components/community/TopicsList";
import { useQueryClient } from "@tanstack/react-query";

const Community = () => {
  const queryClient = useQueryClient();

  const handleTopicCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["community-topics"] });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gradient">Community</h1>
          <CreateTopicDialog onTopicCreated={handleTopicCreated} />
        </div>
        <TopicsList />
      </div>
    </MainLayout>
  );
};

export default Community;