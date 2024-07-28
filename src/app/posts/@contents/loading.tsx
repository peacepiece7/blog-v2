import { ContentsLoading } from "@/components/loading/ContentsLoading"
import { NavigationLoading } from "@/components/loading/NavigationLoading"
import { PostPageLayoutLoading } from "@/components/loading/PostPageLayoutLoading"
import { PostAreaSlideProvider } from "@/contexts/usePostAreaContext"

export default function PostLoadingPage() {
  return (
    <PostAreaSlideProvider>
      <NavigationLoading />
      <PostPageLayoutLoading>
        <ContentsLoading />
      </PostPageLayoutLoading>
    </PostAreaSlideProvider>
  )
}
