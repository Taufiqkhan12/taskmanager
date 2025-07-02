import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Card,
  CardContent,
  Button,
  Divider,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

const drawerWidth = 240;

const Dashboard = () => {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Finish UI", description: "Complete dashboard screen" },
    { id: 2, title: "API Integration", description: "Connect to backend" },
    { id: 3, title: "Fix bugs", description: "Resolve all console errors" },
  ]);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [newTask, setNewTask] = React.useState({ title: "", description: "" });

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdate = (id) => {
    alert(`Navigate to update page for task ID: ${id}`);
  };

  const handleCreateTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      setTasks((prev) => [...prev, { id: Date.now(), ...newTask }]);
      setNewTask({ title: "", description: "" });
      setOpenCreate(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            My Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Task Cards */}
        <Box display="flex" flexWrap="wrap" gap={2}>
          {tasks.map((task) => (
            <Card key={task.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>
              <Box display="flex" justifyContent="space-between" p={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdate(task.id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Floating Button to Create Task */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setOpenCreate(true)}
          sx={{ position: "fixed", bottom: 30, right: 30 }}
        >
          <AddIcon />
        </Fab>

        {/* Dialog for creating task */}
        <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button onClick={handleCreateTask} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
