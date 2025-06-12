import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/integrations/supabase/client";

/**
 * 认证存储
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        try {
          // 调用Supabase登录API
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });

          if (error) throw error;

          // 获取用户角色
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (userError) throw userError;

          set({
            user: {
              id: data.user.id,
              email: email,
              role: userData.role
            },
            token: data.session.access_token
          });

          return Promise.resolve();
        } catch (error) {
          return Promise.reject(new Error(error.message || "登录失败"));
        }
      },

      register: async (email, password) => {
        try {
          // 调用Supabase注册API
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });

          if (error) throw error;

          // 在users表中创建用户记录
          const { error: userError } = await supabase
            .from('users')
            .insert([
              { id: data.user.id, email: email, role: 'user' }
            ]);

          if (userError) throw userError;

          set({
            user: {
              id: data.user.id,
              email: email,
              role: 'user'
            },
            token: data.session?.access_token || null
          });

          return Promise.resolve();
        } catch (error) {
          return Promise.reject(new Error(error.message || "注册失败"));
        }
      },

      logout: async () => {
        try {
          // 调用Supabase登出API
          const { error } = await supabase.auth.signOut();

          if (error) throw error;

          set({ user: null, token: null });
        } catch (error) {
          console.error("登出失败:", error);
        }
      },

      isAuthenticated: () => {
        return !!useAuthStore.getState().user;
      },

      isAdmin: () => {
        return useAuthStore.getState().user?.role === 'admin';
      }
    }),
    {
      name: "auth-storage",
    }
  )
);
