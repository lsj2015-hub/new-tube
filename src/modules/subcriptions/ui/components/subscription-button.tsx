import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface SubscriptionButtonProp {
  onClick: ButtonProps["onClick"]
  disabled: boolean
  isSubscribed: boolean
  className?: string
  size?: ButtonProps["size"]
}

export const SubscriptionButton = ({
  onClick,
  disabled,
  isSubscribed,
  className,
  size
}: SubscriptionButtonProp) => {
  return (
    <Button
      size={size}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("rounded-full", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {isSubscribed ? "Unsubscribe" : "subscribe"}
    </Button>
  )
}