"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDown, LucideIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { type SelectOption } from "@/lib/utils";

/**
 * Variants for the advanced-select component to handle different styles.
 */
const advancedSelectVariants = cva("m-1", {
  variants: {
    variant: {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AdvancedSelectOption = SelectOption;

/**
 * Props for AdvancedSelect component
 */
export interface AdvancedSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof advancedSelectVariants> {
  /**
   * An array of option objects to be displayed in the advanced-select component.
   */
  options: AdvancedSelectOption[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange?: (value: string[]) => void;

  /** The current selected values. */
  value?: string[];

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Whether to show a search input in the dropdown.
   * Default is false.
   */
  searchable?: boolean;

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the advanced-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the advanced-select component.
   */
  className?: string;

  /**
   * Icon to show on the left side of the select trigger.
   */
  leftIcon?: React.ElementType;

  /**
   * Icon to show on the right side of the select trigger (replaces the default chevron).
   */
  rightIcon?: React.ElementType;

  /**
   * Whether the component is in a loading state.
   */
  loading?: boolean;

  /**
   * Callback function triggered when a user wants to create a new option.
   * If provided, a "Create new" option will be shown in the dropdown when search doesn't match.
   */
  onCreate?: (value: string) => void;
}

export const AdvancedSelect = React.forwardRef<
  HTMLButtonElement,
  AdvancedSelectProps
>(
  (
    {
      options,
      onValueChange,
      value: controlledValue,
      variant,
      defaultValue = [],
      searchable = false,
      placeholder = "Select options",
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      onCreate,
      ...props
    },
    ref,
  ) => {
    // Handle controlled vs uncontrolled state
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      controlledValue || defaultValue,
    );

    // Keep internal state synced with controlled value
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setSelectedValues(controlledValue);
      }
    }, [controlledValue]);

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        updateValues(newSelectedValues);
      }
    };

    // Update values and search handling
    const handleSearchChange = (value: string) => {
      setSearchQuery(value);
    };

    // Update both internal state and call onValueChange prop
    const updateValues = (newValues: string[]) => {
      if (controlledValue === undefined) {
        setSelectedValues(newValues);
      }
      onValueChange?.(newValues);
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      updateValues(newSelectedValues);
    };

    const handleClear = () => {
      updateValues([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      updateValues(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        updateValues(allValues);
      }
    };

    // Direct handler for option selection, not relying on CommandItem's onSelect
    const handleOptionClick = (
      optionValue: string,
      event: React.MouseEvent,
    ) => {
      event.preventDefault();
      event.stopPropagation();
      toggleOption(optionValue);
    };

    // Handler for Select All
    const handleSelectAllClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      toggleAll();
    };

    // Handler for Clear button
    const handleClearClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      handleClear();
    };

    // Handler for Close button
    const handleCloseClick = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsPopoverOpen(false);
    };

    // Filter options based on search query
    const filteredOptions =
      searchable && searchQuery
        ? options.filter((option) =>
            (option.label || option.value)
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          )
        : options;

    // Animation variants
    const badgeAnimationVariants = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
    };

    const contentAnimationVariants = {
      hidden: { opacity: 0, y: -5 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    };

    const optionAnimationVariants = {
      hidden: { opacity: 0 },
      visible: (custom: number) => ({
        opacity: 1,
        transition: { delay: custom * 0.03 },
      }),
    };

    // Add a handleMiddleClick handler
    const handleMiddleClick = (
      value: string,
      event: React.MouseEvent<HTMLDivElement>,
    ) => {
      if (event.button === 1) {
        // Middle click
        event.preventDefault();
        toggleOption(value);
      }
    };

    // Handle create new option
    const handleCreateOption = () => {
      if (onCreate && searchQuery.trim()) {
        onCreate(searchQuery.trim());
        setSearchQuery("");
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            disabled={loading || props.disabled}
            className={cn(
              "flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 transition-all duration-200 hover:bg-inherit [&_svg]:pointer-events-auto",
              loading && "cursor-not-allowed opacity-50",
              className,
            )}
            data-slot="advanced-select-trigger"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex min-h-[28px] flex-1 items-center pl-2">
                {loading ? (
                  <div className="flex items-center">
                    <div className="border-primary mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                ) : (
                  <>
                    {LeftIcon && (
                      <LeftIcon className="text-muted-foreground mr-2 h-4 w-4 shrink-0" />
                    )}
                    {selectedValues.length > 0 ? (
                      <div className="flex w-full flex-wrap items-center gap-1">
                        <AnimatePresence>
                          {selectedValues
                            ?.slice(0, maxCount)
                            ?.map?.((value, index) => {
                              const option = options.find(
                                (o) => o.value === value,
                              );
                              const IconComponent = option?.icon;
                              return (
                                <motion.div
                                  key={value}
                                  variants={badgeAnimationVariants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  layout
                                  onMouseDown={(e) =>
                                    handleMiddleClick(value, e)
                                  }
                                >
                                  <Badge
                                    color="zinc"
                                    className={cn(
                                      advancedSelectVariants({ variant }),
                                    )}
                                    data-slot="advanced-select-badge"
                                  >
                                    {IconComponent && (
                                      <IconComponent className="mr-2 h-4 w-4" />
                                    )}
                                    {option?.emoji && (
                                      <span className="mr-2">
                                        {option.emoji}
                                      </span>
                                    )}
                                    {option?.label || option?.value}
                                    <XIcon
                                      className="ml-2 h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        toggleOption(value);
                                      }}
                                    />
                                  </Badge>
                                </motion.div>
                              );
                            })}
                        </AnimatePresence>
                        {selectedValues.length > maxCount && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Badge
                              color="zinc"
                              variant="outline"
                              className="ml-1"
                              onClick={clearExtraOptions}
                            >
                              +{selectedValues.length - maxCount} more
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="text-muted-foreground truncate px-2">
                        {placeholder}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="ml-2 flex shrink-0 items-center justify-center pr-2">
                {RightIcon ? (
                  <RightIcon className="text-foreground h-5 w-5" />
                ) : (
                  <ChevronDown className="h-4 w-4 opacity-50" />
                )}
              </div>
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          data-slot="advanced-select-content"
          asChild
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentAnimationVariants}
            className="w-[var(--radix-popover-trigger-width)]"
            style={{
              width: "var(--radix-popover-trigger-width)",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            <Command shouldFilter={false}>
              {searchable && (
                <CommandInput
                  placeholder="Search..."
                  onKeyDown={handleInputKeyDown}
                  onValueChange={handleSearchChange}
                  value={searchQuery}
                  data-slot="advanced-select-search"
                />
              )}
              <CommandList className="max-h-[300px]">
                {searchable &&
                  filteredOptions.length === 0 &&
                  searchQuery &&
                  onCreate && (
                    <CommandEmpty className="py-0">
                      <div
                        className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center px-2 py-1.5 text-sm"
                        onClick={handleCreateOption}
                      >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm">
                          <span className="text-xl">+</span>
                        </div>
                        Create "{searchQuery}"
                      </div>
                    </CommandEmpty>
                  )}
                {searchable &&
                  filteredOptions.length === 0 &&
                  (!searchQuery || !onCreate) && (
                    <CommandEmpty className="py-1.5">
                      No results found.
                    </CommandEmpty>
                  )}

                <CommandGroup>
                  {!searchable && (
                    <>
                      <motion.div
                        variants={optionAnimationVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm select-none"
                        onClick={handleSelectAllClick}
                        data-select-all="true"
                      >
                        <div
                          className={cn(
                            "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                            selectedValues.length === options.length
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        <span>(Select All)</span>
                      </motion.div>
                      <CommandSeparator />
                    </>
                  )}
                  {filteredOptions.map((option, index) => {
                    const isSelected = selectedValues.includes(option.value);
                    const IconComponent = option.icon;
                    return (
                      <motion.div
                        key={option.value}
                        variants={optionAnimationVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index + 1}
                        className={cn(
                          "relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors select-none",
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground",
                        )}
                        onClick={(event) =>
                          handleOptionClick(option.value, event)
                        }
                        onMouseDown={(e) => {
                          if (e.button === 1) {
                            // Middle click
                            e.preventDefault();
                            toggleOption(option.value);
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {IconComponent && (
                          <IconComponent className="text-muted-foreground mr-2 h-4 w-4" />
                        )}
                        {option.emoji && (
                          <span className="mr-2">{option.emoji}</span>
                        )}
                        <span>{option.label || option.value}</span>
                      </motion.div>
                    );
                  })}
                  {searchable &&
                    onCreate &&
                    searchQuery &&
                    filteredOptions.length > 0 &&
                    !filteredOptions.some(
                      (option) =>
                        option.label?.toLowerCase() ===
                          searchQuery.toLowerCase() ||
                        option.value.toLowerCase() ===
                          searchQuery.toLowerCase(),
                    ) && (
                      <motion.div
                        variants={optionAnimationVariants}
                        initial="hidden"
                        animate="visible"
                        custom={filteredOptions.length + 1}
                        className="hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors select-none"
                        onClick={handleCreateOption}
                      >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm">
                          <span className="text-xl">+</span>
                        </div>
                        <span>Create "{searchQuery}"</span>
                      </motion.div>
                    )}
                </CommandGroup>

                <CommandGroup>
                  <div className="flex items-center justify-between">
                    {selectedValues.length > 0 && (
                      <>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="hover:bg-accent hover:text-accent-foreground flex-1 cursor-pointer justify-center py-1.5 text-center text-sm"
                          onClick={handleClearClick}
                        >
                          Clear
                        </motion.div>
                        <Separator
                          orientation="vertical"
                          className="flex h-full min-h-6"
                        />
                      </>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hover:bg-accent hover:text-accent-foreground flex-1 cursor-pointer justify-center py-1.5 text-center text-sm"
                      onClick={handleCloseClick}
                    >
                      Close
                    </motion.div>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </motion.div>
        </PopoverContent>
      </Popover>
    );
  },
);

AdvancedSelect.displayName = "AdvancedSelect";
