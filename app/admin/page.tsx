"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  Users,
  FileText,
  Heart,
  Shield,
  Trash2,
  UserCog,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  type AdminStats,
  type AdminUser,
  categoryIcons,
  categoryArray,
} from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.id) {
      router.push("/");
      return;
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchData();
  }, [session, status, router, fetchData]);

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    setUpdatingRole(userId);
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        if (newRole === "admin") {
          setStats(
            stats
              ? { ...stats, adminCount: stats.adminCount + 1 }
              : null
          );
        } else {
          setStats(
            stats
              ? { ...stats, adminCount: stats.adminCount - 1 }
              : null
          );
        }
      } else {
        const data = await res.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Failed to update role",
        });
      }
    } catch (error) {
      console.error("Failed to update role:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update role",
      });
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setStats(
          stats
            ? {
                ...stats,
                totalUsers: stats.totalUsers - 1,
                adminCount:
                  userToDelete.role === "admin"
                    ? stats.adminCount - 1
                    : stats.adminCount,
              }
            : null
        );
        setUserToDelete(null);
      } else {
        const data = await res.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Failed to delete user",
        });
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  if (!session?.user?.id || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage users, view statistics, and monitor activity
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tips</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalTips || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalFavorites || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.adminCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Statistics */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tips by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryArray.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <div
                  key={category}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Icon className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {category.toLowerCase()}
                    </p>
                    <p className="text-2xl font-bold">
                      {stats?.categoryStats?.[category] || 0}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Tips</th>
                  <th className="text-left py-3 px-4 font-medium">Favorites</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">
                          {user.name || "No name"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email || "No email"}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user._count.createdTips}</td>
                    <td className="py-3 px-4">{user._count.favorites}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoleToggle(user.id, user.role)}
                          disabled={
                            updatingRole === user.id ||
                            user.id === session.user.id
                          }
                        >
                          <UserCog className="h-4 w-4 mr-1" />
                          {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setUserToDelete(user)}
                          disabled={user.id === session.user.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete User Dialog */}
      <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone. All their tips and favorites will also be deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">{userToDelete?.name || "No name"}</p>
            <p className="text-sm text-muted-foreground">
              {userToDelete?.email}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
