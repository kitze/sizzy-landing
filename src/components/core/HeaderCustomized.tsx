import { cn } from "@/lib/utils";
import { PageHeader, type PageHeaderProps } from "@/components/PageHeader";
import { HEADER_HEIGHT } from "@/config/config";

type HeaderCustomizedProps = Omit<PageHeaderProps, "height" | "classNames"> & {
  classNames?: PageHeaderProps["classNames"];
};

/*
  a variant of PageHeader customized for this particular app.
  it starts with no bg and when the user scrolls, it adds a bg and shadow accordingly.
  it also respects the container-max-width config from our globals.css
  feel free to change as you like.
*/
export function HeaderCustomized({
  classNames,
  ...props
}: HeaderCustomizedProps) {
  return (
    <PageHeader
      {...props}
      height={HEADER_HEIGHT}
      classNames={{
        root: cn(
          "px-0 bg-none fixed transition-all duration-300 backdrop-blur-[0px]",
          "data-[scrolled=true]:bg-background/50 data-[scrolled=true]:shadow-xs dark:data-[scrolled=true]:shadow-none dark:data-[scrolled=true]:bg-[rgb(19_17_28_/_90%)] data-[scrolled=true]:backdrop-blur-lg",
          classNames?.root,
        ),
        container: cn(
          "px-4 max-w-[var(--container-max-width)]",
          classNames?.container,
        ),
        leftSide: classNames?.leftSide,
        middle: classNames?.middle,
        rightSide: classNames?.rightSide,
        menuButton: classNames?.menuButton,
        pastScrolled: classNames?.pastScrolled,
      }}
    />
  );
}
