import { Database } from "./types";

export type CommunityTopic = Database["public"]["Tables"]["community_topics"]["Row"];
export type CommunityTopicInsert = Database["public"]["Tables"]["community_topics"]["Insert"];
export type CommunityTopicUpdate = Database["public"]["Tables"]["community_topics"]["Update"];