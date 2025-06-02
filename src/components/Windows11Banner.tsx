import React, { useState } from "react";
import { Badge, Text, Paper, Button, Collapse, Box, ThemeIcon } from "@mantine/core";
import { FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Horizontal, Vertical } from "styles/layout-components";
import { ReactFC } from "types";

export const Windows11Banner: ReactFC<{}> = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "fit-content" }}>
        {/* Small Badge */}
        <Badge
          size="lg"
          radius="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 45 }}
          sx={{
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={toggleExpanded}
        >
          <Horizontal spacing="xs" center>
            <ThemeIcon size="sm" radius="xl" variant="light" color="blue">
              <FaInfoCircle size={12} />
            </ThemeIcon>
            <Text size="sm" weight={600}>
              Windows 11 Issue Resolved
            </Text>
            {expanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </Horizontal>
        </Badge>

        {/* Expanded Content */}
        <Collapse in={expanded}>
          <Paper
            radius="md"
            p="md"
            mt="sm"
            sx={(theme) => ({
              background:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.blue[0],
              border: `1px solid ${theme.colors.blue[2]}`,
              boxShadow: theme.shadows.sm,
            })}
          >
            <Vertical spacing="sm">
              <Text weight={600} size="md" color="blue">
                🎉 Windows 11 Installation Issue Resolved!
              </Text>
              <Text size="sm" color="dimmed">
                We've fixed the installation issues that some users were experiencing on Windows 11.
                The latest version is now available for manual download and should install without
                any problems. Unfortunately, if your installation is already broken, you'll need to
                download the latest installer and manually install it.
              </Text>
              <Button
                component="a"
                href="https://updates.sizzy.co"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                color="blue"
                size="sm"
                radius="md"
              >
                Download Latest Installer
              </Button>
            </Vertical>
          </Paper>
        </Collapse>
      </Box>
    </Box>
  );
};
