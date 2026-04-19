import { EmptyState } from '../../components';

export default function BusinessNotFound() {
  return (
    <EmptyState
      title="Business wasn't found"
      description="The business you're looking for doesn't exist or the link is invalid."
    />
  );
}
